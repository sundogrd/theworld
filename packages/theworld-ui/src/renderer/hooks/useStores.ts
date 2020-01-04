import * as React from 'react'
import { MobXProviderContext } from 'mobx-react'
import { TStore } from '../store'
function useStores(): TStore {
    return React.useContext(MobXProviderContext)
}

export default useStores
