

import appLoader from 'loaders/express/app'
import socketLoader from 'loaders/ws/socket'
import {LOAD_WEBSOCKET} from '/config/define'

function startServer(){
    const app = appLoader()

    if (LOAD_WEBSOCKET){
        socketLoader(app)
    }
}

startServer()