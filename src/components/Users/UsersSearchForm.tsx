import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FilterType } from '../../reduxx/users-reducer'
import { getUsersFilter } from '../../reduxx/users-selectors'
import { useSelector } from 'react-redux'
import classes from './Users.module.css'

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

type FriendFormType = 'true' | 'false' | 'null'

type FormType = {
  term: string
  friend: FriendFormType
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const filter = useSelector(getUsersFilter)

  const submit = (values: FormType) => {
    const filter: FilterType = {
      term: values.term,
      friend:
        values.friend === 'null'
          ? null
          : values.friend === 'true'
          ? true
          : false,
    }

    props.onFilterChanged(filter)
  }

  return (
    <div className={classes.search_form_users}>
      <h1>Find somebody!</h1>
      <Formik
        enableReinitialize={true}
        initialValues={{
          term: filter.term,
          friend: String(filter.friend) as FriendFormType,
        }}
        validationSchema={Yup.object({
          term: Yup.string(),
        })}
        onSubmit={submit}
      >
        {(formik) => {
          return (
            <Form className={classes.form}>
              <Field type="text" name="term" />
              <Field name="friend" as="select">
                <option value="null">All</option>
                <option value="true">Friends</option>
                <option value="false">Not friends</option>
              </Field>
              <button type="submit" disabled={!formik.isValid}>
                Submit
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
})

export default UsersSearchForm
