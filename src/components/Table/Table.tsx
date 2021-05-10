import React, { FunctionComponent } from 'react'
import { CircularProgress } from '@material-ui/core'

import TableHead from './TableHead'
import TableBody from './TableBody'

import { TUser } from '../../types/types'

import { useProgressStyles } from '../../styles/styles'

interface IProps {
  columns: Array<string>
  data: Array<TUser>
}

const Table: FunctionComponent<IProps> = (props) => {
  const { columns, data } = props

  const progressClasses = useProgressStyles()

  return (
    <div>
      <TableHead columns={ columns } />
      <TableBody data={ data } />
    </div>
  )
}

export default Table
