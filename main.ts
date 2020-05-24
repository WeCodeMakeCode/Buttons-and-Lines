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
function do_Kal (aSprite: Sprite, colors_string: string) {
    colors_list = colors_string.split("|")
    cx = Math.floor(aSprite.width / 2)
    cy = Math.floor(aSprite.height / 2)
    n = 0
    for (let index3 = 0; index3 <= aSprite.width - 2; index3++) {
        aSprite.image.drawLine(cx, cy, index3, 0, parseFloat(colors_list[n]))
        n = (n + 1) % colors_list.length
    }
    for (let index4 = 0; index4 <= aSprite.height - 2; index4++) {
        aSprite.image.drawLine(cx, cy, aSprite.width - 1, index4, parseFloat(colors_list[n]))
        n = (n + 1) % colors_list.length
    }
    for (let index5 = 0; index5 <= aSprite.width - 2; index5++) {
        aSprite.image.drawLine(cx, cy, aSprite.width - index5 - 1, aSprite.height - 1, parseFloat(colors_list[n]))
        n = (n + 1) % colors_list.length
    }
    for (let index6 = 0; index6 <= aSprite.height - 2; index6++) {
        aSprite.image.drawLine(cx, cy, 0, aSprite.height - index6 - 1, parseFloat(colors_list[n]))
        n = (n + 1) % colors_list.length
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    color_stg = ""
    for (let index2 = 0; index2 <= buttons.length - 1; index2++) {
        if (index2 == 0) {
            color_stg = "" + index2
        } else {
            color_stg = "" + color_stg + "|" + index2
        }
    }
    if (color_stg.length > 0) {
        screen_sprite.z = 2
        do_Kal(screen_sprite, color_stg)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    make_active(sprites.readDataNumber(active_button, "row"), sprites.readDataNumber(active_button, "col") + 1)
})
function set_border_color (aSprite: Sprite, aColor: number) {
    aSprite.image.drawRect(0, 0, 40, 30, aColor)
    aSprite.image.drawRect(1, 1, 38, 28, aColor)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    make_active(sprites.readDataNumber(active_button, "row") - 1, sprites.readDataNumber(active_button, "col"))
})
let color_stg: string = []
let n = 0
let cy = 0
let cx = 0
let colors_list: string[] = []
let Col = 0
let Row = 0
let active_button: Sprite = null
let a_button: Sprite = null
let buttons: Sprite[] = []
let screen_sprite: Sprite = null
screen_sprite = sprites.create(image.create(160, 120), SpriteKind.Player)
buttons = sprites.allOfKind(SpriteKind.Button)
create_buttons()
make_active(2, 2)
