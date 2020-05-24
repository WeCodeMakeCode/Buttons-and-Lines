namespace SpriteKind {
    export const Button = SpriteKind.create()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    make_active(sprites.readDataNumber(active_button, "row"), sprites.readDataNumber(active_button, "col") - 1)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    make_active(sprites.readDataNumber(active_button, "row") + 1, sprites.readDataNumber(active_button, "Col"))
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    sprites.setDataBoolean(active_button, "selected", !(sprites.readDataBoolean(active_button, "selected")))
    set_state_borders()
})
function make_active (row: number, col: number) {
    active_button = buttons[4 * row + col]
    set_state_borders()
}
function set_state_borders () {
    for (let value of buttons) {
        if (sprites.readDataBoolean(value, "selected") == true) {
            console.log("Selected")
            set_border_color(value, 2)
        } else if (value == active_button) {
            console.log("Active")
            set_border_color(value, 5)
        } else {
            console.log("Black")
            set_border_color(value, 15)
        }
    }
}
function create_coloe_buttons () {
    for (let index = 0; index <= 14; index++) {
        Color = index + 1
        a_button = sprites.create(image.create(40, 30), SpriteKind.Button)
        sprites.setDataBoolean(a_button, "selected", false)
        sprites.setDataNumber(a_button, "row", 40 * (index % 4))
        sprites.setDataNumber(a_button, "col", 30 * Math.floor(index / 4))
        a_button.image.fill(Color)
        a_button.top = sprites.readDataNumber(a_button, "row")
        a_button.left = sprites.readDataNumber(a_button, "col")
        buttons.push(a_button)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    make_active(sprites.readDataNumber(active_button, "row"), sprites.readDataNumber(active_button, "col") + 1)
})
function set_border_color (aSprite: Sprite, color: number) {
    aSprite.image.drawRect(0, 0, 40, 30, color)
    aSprite.image.drawRect(1, 1, 38, 28, color)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    make_active(sprites.readDataNumber(active_button, "row") - 1, sprites.readDataNumber(active_button, "Col"))
})
let a_button: Sprite = null
let Color = 0
let active_button: Sprite = null
let buttons: Sprite[] = []
buttons = sprites.allOfKind(SpriteKind.Button)
let yellow = 3
scene.setBackgroundColor(15)
create_coloe_buttons()
make_active(1, 1)
