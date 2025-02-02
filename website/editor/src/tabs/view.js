// @flow

import * as React from 'react'
import {useStore} from 'effector-react'
import {tab as _tab, tabApi} from './domain'
import {GraphiteView} from '../graphite/view'
import {Settings, flowToggle as _flowToggle} from '../settings'
import {TypeErrorsView} from '../flow/view'
import {Share} from '../share'
import {TabHeader, TabHeaderList} from './styled'
import {mediaQuery} from '../components/mediaQuery'

const SmallScreens = mediaQuery('(max-width: 699px)')

export const TabsView = () => {
  const tab = useStore(_tab)
  const flowToggle = useStore(_flowToggle)
  return (
    <>
      <TabHeaderList className="header-tabs">
        <SmallScreens>
          <TabHeader onClick={tabApi.showEditor} isActive={tab === 'editor'}>
            Editor
          </TabHeader>
          <TabHeader onClick={tabApi.showOutline} isActive={tab === 'outline'}>
            Outline
          </TabHeader>
        </SmallScreens>
        {flowToggle && (
          <TabHeader onClick={tabApi.showErrors} isActive={tab === 'errors'}>
            Errors
          </TabHeader>
        )}
        <TabHeader onClick={tabApi.showDOM} isActive={tab === 'dom'}>
          DOM
        </TabHeader>
        <TabHeader onClick={tabApi.showShare} isActive={tab === 'share'}>
          Share
        </TabHeader>
        <TabHeader onClick={tabApi.showSettings} isActive={tab === 'settings'}>
          Settings
        </TabHeader>
      </TabHeaderList>
      {tab === 'graphite' && <GraphiteView />}
      <div
        style={{visibility: tab === 'dom' ? 'visible' : 'hidden'}}
        className="dom">
        <iframe id="dom" />
      </div>
      {tab === 'share' && <Share />}
      {tab === 'settings' && <Settings />}
      {tab === 'errors' && <TypeErrorsView />}
    </>
  )
}
