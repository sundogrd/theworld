import * as React from 'react'
import { MobXProviderContext } from 'mobx-react'
function useStores(): any {
    return React.useContext(MobXProviderContext)
}

export default useStores
