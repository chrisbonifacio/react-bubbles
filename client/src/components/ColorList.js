import React, { useState } from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth"

const initialColor = {
  color: "",
  code: { hex: "" }
}

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false)
  const [colorToEdit, setColorToEdit] = useState(initialColor)
  const [colorToAdd, setColorToAdd] = useState(initialColor)

  const editColor = color => {
    setEditing(true)
    setColorToEdit(color)
  }

  const saveEdit = e => {
    e.preventDefault()
    const color = colors.find(item => colorToEdit.code.hex === item.code.hex)
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
    axiosWithAuth()
      .put(`/colors/${color}`, colorToEdit)
      .then(res => {
        updateColors([...colors, res.data])
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    updateColors(
      colors.filter(item => {
        return item.id !== color.id
      })
    )
  }

  // STRETCH
  const addColor = event => {
    event.preventDefault()
    axiosWithAuth()
      .post("/colors", colorToAdd)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    updateColors([...colors, { ...colorToAdd, id: colors.length + 1 }])
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => {
          return (
            <li key={color.id} onClick={() => editColor(color)}>
              <span>
                <span className="delete" onClick={() => deleteColor(color)}>
                  x
                </span>
                {color.color}
              </span>
              <div
                className="color-box"
                style={{ backgroundColor: color.code.hex }}
              />
            </li>
          )
        })}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">add</button>
        </div>
      </form>
      <div className="spacer" />
    </div>
  )
}

export default ColorList
