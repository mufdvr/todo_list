import React, { useState } from 'react'
import classNames from 'classnames'
import T from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

import { Header, Autocomplete } from 'components'
import { Todo } from '../../models'
import styles from './todoForm.module.scss'

const TodoForm = ({ todoItem, onSave, className }) => {
  const [todo, setTodo] = useState(todoItem || new Todo())

  const handleChange = ({ target: { name, value } }) => setTodo(new Todo({ ...todo, [name]: value }))

  const handleChangeImportance = value => () => setTodo(new Todo({ ...todo, importance: todo.importance ^ value }))

  const handleChangeTag = tag => setTodo(new Todo({ ...todo, tag }))

  const todoFormClass = classNames(styles.wrapper, className)

  const { importance, statuses } = Todo

  const tagSuggestions = [
    { value: 'tag0', label: 'Тег0' },
    { value: 'tag1', label: 'Тег1' },
    { value: 'tag2', label: 'Тег2' },
    { value: 'tag3', label: 'Тег3' },
  ]

  return (
    <div className={todoFormClass}>
      <Header title="Новая задача" />
      <div className={styles.fields}>
        <TextField required onChange={handleChange} value={todo.title} label="Название" name="title" margin="normal" />
        <TextField
          multiline
          onChange={handleChange}
          value={todo.description}
          label="Описание"
          name="description"
          margin="normal"
        />
        <TextField
          required
          type="date"
          onChange={handleChange}
          value={todo.date}
          label="Дата выполнения"
          name="date"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {todo.date && (
          <div className={styles.checkBoxes}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!(todo.importance & importance[0].value)}
                  onChange={handleChangeImportance(importance[0].value)}
                  color="primary"
                />
              }
              label={importance[0].label}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!(todo.importance & importance[1].value)}
                  onChange={handleChangeImportance(importance[1].value)}
                  color="primary"
                />
              }
              label={importance[1].label}
            />
          </div>
        )}
        <FormControl margin="normal">
          <InputLabel htmlFor="todo-status">Статус</InputLabel>
          <Select
            value={todo.status}
            onChange={handleChange}
            inputProps={{
              name: 'status',
              id: 'todo-status',
            }}
          >
            {Object.entries(statuses).map((status, idx) => (
              <MenuItem key={idx} value={status[0]}>
                {status[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl margin="normal">
          <Autocomplete value={todo.tag} onChange={handleChangeTag} suggestions={tagSuggestions} placeholder="Тег" />
        </FormControl>
      </div>
      <Button onClick={() => onSave(todo)} color="primary">
        Добавить задачу
      </Button>
    </div>
  )
}

TodoForm.propTypes = {
  onSave: T.func,
  className: T.string,
}

export default TodoForm
