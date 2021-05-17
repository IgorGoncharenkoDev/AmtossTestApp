import React, { FunctionComponent, ReactElement } from 'react'
import { Container } from '@material-ui/core'
import { usePageContainerStyles } from '../styles/styles'

interface IProps {
	children: ReactElement
}

const PageContainer: FunctionComponent<IProps> = (props) => {
	const classes = usePageContainerStyles()

	return (
		<div>
			<Container maxWidth="lg" className={ classes.pageContainer }>
				{ props.children }
			</Container>
		</div>
	)
}

export default PageContainer
