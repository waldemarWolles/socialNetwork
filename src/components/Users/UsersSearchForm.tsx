import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FilterType } from '../../reduxx/users-reducer'


type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

type FormType = {
  term: string,
  friend: 'true' | 'false' | 'null'
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const submit = (values: FormType) => {
    debugger
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }

    props.onFilterChanged(filter)
  }


  return <div>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{ term: '', friend: 'null' }}
      validationSchema={Yup.object({
        term: Yup.string()
      })}
      onSubmit={submit}
    >
      {
        formik => {
          return <Form>
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
        }
      }
    </Formik>
  </div>

})



export default UsersSearchForm

