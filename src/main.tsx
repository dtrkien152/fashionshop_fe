import {Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import store, {persist} from "~/redux/store.ts";

function WrappedApp() {
    return (
        <Suspense fallback='...is loading'>
            <App/>
        </Suspense>
    )
}

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
            <WrappedApp></WrappedApp>
        </PersistGate>
    </Provider>
)
