namespace SpriteKind {
    export const Button = SpriteKind.create()
}
function create_buttons () {
    buttons = sprites.allOfKind(SpriteKind.Button)
    for (let index2 = 0; index2 <= 15; index2++) {
        a_button = sprites.create(image.create(40, 30), SpriteKind.Button)
        sprites.setDataBoolean(a_button, "selected", false)
        sprites.setDataNumber(a_button, "row", Math.floor(index2 / 4))
        sprites.setDataNumber(a_button, "col", index2 % 4)
        a_button.image.fill(index2)
        a_button.top = 30 * sprites.readDataNumber(a_button, "row")
        a_button.left = 40 * sprites.readDataNumber(a_button, "col")
        a_button.z = 0
        buttons.push(a_button)
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if_buttons_make_active(sprites.readDataNumber(active_button, "row"), sprites.readDataNumber(active_button, "col") - 1)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if_buttons_make_active(sprites.readDataNumber(active_button, "row") + 1, sprites.readDataNumber(active_button, "col"))
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (b_state_is_buttons) {
        sprites.setDataBoolean(active_button, "selected", !(sprites.readDataBoolean(active_button, "selected")))
        set_state_borders()
    }
})
function if_buttons_make_active (row: number, col: number) {
    if (b_state_is_buttons) {
        Row = Math.abs(row) % 4
        Col = Math.abs(col) % 4
        active_button = buttons[4 * Row + Col]
        set_state_borders()
    }
}
function uncover_buttons () {
    behind_draw_on_sprite.z = -2
    draw_on_sprite.z = -1
}
function do_lines_pattern (aSprite: Sprite, colors_string: string) {
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
function set_state_borders () {
    for (let value2 of buttons) {
        if (sprites.readDataBoolean(value2, "selected") == true) {
            set_border_color(value2, 2)
        } else if (value2 == active_button) {
            set_border_color(value2, 5)
        } else {
            set_border_color(value2, 15)
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    b_state_is_buttons = !(b_state_is_buttons)
    draw_on_sprite.image.fill(15)
    if (b_state_is_buttons) {
        uncover_buttons()
    } else {
        make_cs_string_from_colors_of_selected_buttons()
        if (cs.length > 0) {
            cover_buttons()
            do_lines_pattern(draw_on_sprite, cs)
        }
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if_buttons_make_active(sprites.readDataNumber(active_button, "row"), sprites.readDataNumber(active_button, "col") + 1)
})
function make_cs_string_from_colors_of_selected_buttons () {
    cs = ""
    for (let index22 = 0; index22 <= buttons.length - 1; index22++) {
        if (sprites.readDataBoolean(buttons[index22], "selected")) {
            if (index22 == 0) {
                cs = "" + index22
            } else {
                cs = "" + cs + "|" + index22
            }
        }
    }
}
function make_screen_size_sprites () {
    draw_on_sprite = sprites.create(image.create(160, 120), SpriteKind.Player)
    draw_on_sprite.image.fill(15)
    behind_draw_on_sprite = sprites.create(image.create(160, 120), SpriteKind.Player)
    behind_draw_on_sprite.image.fill(15)
}
function set_border_color (aSprite: Sprite, aColor: number) {
    aSprite.image.drawRect(0, 0, 40, 30, aColor)
    aSprite.image.drawRect(1, 1, 38, 28, aColor)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if_buttons_make_active(sprites.readDataNumber(active_button, "row") - 1, sprites.readDataNumber(active_button, "col"))
})
function cover_buttons () {
    behind_draw_on_sprite.z = 1
    draw_on_sprite.z = 2
}
let n = 0
let cy = 0
let cx = 0
let colors_list: string[] = []
let draw_on_sprite: Sprite = null
let behind_draw_on_sprite: Sprite = null
let Col = 0
let Row = 0
let active_button: Sprite = null
let a_button: Sprite = null
let buttons: Sprite[] = []
let b_state_is_buttons = false
let cs = ""
cs = ""
make_screen_size_sprites()
create_buttons()
b_state_is_buttons = true
uncover_buttons()
if_buttons_make_active(2, 2)
