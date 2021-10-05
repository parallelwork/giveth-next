import { Flex } from 'theme-ui'
import React from 'react'
import MyProjects from './myProjects'
const MyAccount = React.lazy(() => import('../../components/account/myAccount'))
const MyDonations = React.lazy(() =>
  import('../../components/account/myDonations')
)

const SetView = props => {
  const { query, projectsList, isSSR, userDonations } = props
  const { view, data } = query
  switch (view) {
    case 'projects':
      switch (data) {
        case 'all':
          return <MyProjects projects={projectsList} />
        default:
          return <MyProjects projects={projectsList} edit={data} />
      }
    case 'donations':
      return (
        !isSSR && (
          <React.Suspense fallback={<div />}>
            <MyDonations donations={userDonations} />
          </React.Suspense>
        )
      )
    default:
      return (
        !isSSR && (
          <React.Suspense fallback={<div />}>
            <MyAccount
              info={{
                myDonations: userDonations?.length,
                myProjects: projectsList?.length
              }}
            />
          </React.Suspense>
        )
      )
  }
}
const AccountBody = props => {
  const { query, setQuery, projectsList, isSSR, userDonations } = props

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        width: ['100%', null, '70%'],
        mt: ['100px', '140px', '140px']
      }}
    >
      <SetView
        query={query}
        projectsList={projectsList}
        isSSR={isSSR}
        userDonations={userDonations}
      />
    </Flex>
  )
}
export default AccountBody
