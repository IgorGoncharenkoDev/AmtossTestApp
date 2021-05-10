import { makeStyles, createStyles, Theme } from '@material-ui/core'
import { greyMain, greySecondary, greyDark } from './colors/app-colors'

export const useBaseStyles = makeStyles((theme: Theme) => createStyles({
  app: {
    flexGrow: 1,
    backgroundColor: greyMain
  },
  paper: {
    padding: '1.5rem'
  }
}))

export const usePageContainerStyles = makeStyles((theme: Theme) => createStyles({
  pageContainer: {
    paddingTop: '2rem'
  },
}))

export const usePageStyles = makeStyles((theme: Theme) => createStyles({
  pageTitle: {
    fontSize: '2.25rem',
    fontFamily: '\'Crimson Text\', serif',
    fontWeight: 600,
  },
}))

export const useTableStyles = makeStyles((theme: Theme) => createStyles({
  tableRow: {
    display: 'flex',
  },
  tableBodyRow: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: greyDark
    }
  },
  tableHeaderCell: {
    fontSize: '1.25rem',
    fontWeight: 600,
    borderBottom: `1px solid ${ greySecondary }`
  },
  tableCell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    padding: '1rem'
  }
}))

export const useUpdateUserStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    }
  },
  button: {
    margin: theme.spacing(1),
  }
}))

export const useProgressStyles = makeStyles((theme: Theme) => createStyles({
  progressContainer : {
    display: 'flex',
    justifyContent: 'center',
    padding: '4rem 0',
  }
}))
