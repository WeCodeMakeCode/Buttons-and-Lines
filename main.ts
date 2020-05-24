namespace SpriteKind {
    export const Button = SpriteKind.create()
}
function create_buttons () {
    for (let index = 0; index <= 15; index++) {
        a_button = sprites.create(image.create(40, 30), SpriteKind.Button)
        sprites.setDataBoolean(a_button, "selected", false)
        sprites.setDataNumber(a_button, "row", Math.floor(index / 4))
        sprites.setDataNumber(a_button, "col", index % 4)
        a_button.image.fill(index)
        a_button.top = 30 * sprites.readDataNumber(a_button, "row")
        a_button.left = 40 * sprites.readDataNumber(a_button, "col")
        buttons.push(a_button)
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    make_active(sprites.readDataNumber(active_button, "row"), sprites.readDataNumber(active_button, "col") - 1)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    make_active(sprites.readDataNumber(active_button, "row") + 1, sprites.readDataNumber(active_button, "col"))
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    sprites.setDataBoolean(active_button, "selected", !(sprites.readDataBoolean(active_button, "selected")))
    set_state_borders()
})
function make_active (row: number, col: number) {
    Row = Math.abs(row) % 4
    Col = Math.abs(col) % 4
    active_button = buttons[4 * Row + Col]
    set_state_borders()
}
function set_state_borders () {
    for (let value of buttons) {
        if (sprites.readDataBoolean(value, "selected") == true) {
            set_border_color(value, 2)
        } else if (value == active_button) {
            set_border_color(value, 5)
        } else {
            set_border_color(value, 15)
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    colors = ""
    for (let index = 0; index <= buttons.length - 1; index++) {
        if (index == 0) {
            colors = "" + index
        } else {
            colors = "" + colors + "|" + index
        }
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    make_active(sprites.readDataNumber(active_button, "row"), sprites.readDataNumber(active_button, "col") + 1)
})
function set_border_color (aSprite: Sprite, color: number) {
    aSprite.image.drawRect(0, 0, 40, 30, color)
    aSprite.image.drawRect(1, 1, 38, 28, color)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    make_active(sprites.readDataNumber(active_button, "row") - 1, sprites.readDataNumber(active_button, "col"))
})
let colors = ""
let Col = 0
let Row = 0
let active_button: Sprite = null
let a_button: Sprite = null
let buttons: Sprite[] = []
buttons = sprites.allOfKind(SpriteKind.Button)
create_buttons()
make_active(2, 2)
