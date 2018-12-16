/** 서버사이드 렌더링 미들웨어 */
import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { renderToString } from 'react-dom/server'
import render from './render'
import rootSaga from '../../redux/sagas'
import configureStore from '../../redux/configureStore'

const template = fs.readFileSync(
  path.join(__dirname, '../../public/index.html'),
  { encoding: 'utf-8' }
)

const renderer = (req: Request, res: Response) => {
  const location = req.path
  const store = configureStore()
  const appWithRouter = render(location, store)

  store.runSaga(rootSaga).done.then(() => {
    const html = renderToString(appWithRouter)
    const state = store.getState()

    const page = template.replace('<div id="root"></div>',
    `<div id="root">${html}</div>
      <script>window.__PRELOADED_STATE__=${JSON.stringify(state)}</script>`
    )

    res.send(page)
  })
  .catch(error => console.log(error))

  /**
   * https://github.com/yelouafi/redux-saga/issues/255#issuecomment-210275959
   * renderToString이 두번 호출된다.
   * 이 구문은 컴포넌트를 실행시키기 위한 호출이며 여기서 api가 호출된다.
   * done 구문에서의 renderToString은 렌더를 위한 것이고 saga는 이미 종료되었으므로 api는 호출되지 않는다.
   */
  renderToString(appWithRouter)
  /**
   * saga를 END 시키면 take때문에 이벤트를 기다리던 saga가 종료되면서 done 이후로 넘길 수 있다.
   * done 이후의 then 구문에서 response를 수행한다.
   * render모듈 호출 시 componentWillMount에서 api가 request되고,
   * yield구문이 Iterator에 의해 동작하므로 비동기 동작이 끝날 때까지 스크립트를 기다리게 할 수 있다.
   * 비동기 동작이 완료되고 take구문에서 대기할 때 END가 수행된다.
   */
  store.close()
}

export default renderer
