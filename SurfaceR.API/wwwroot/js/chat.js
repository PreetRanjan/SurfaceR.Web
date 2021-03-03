"use strict";

jQuery.fn.rotateR = function (x,y,z) {

    $(this).css({ 'transform': 'rotateX(' + x + 'deg)' + ' rotateY(' + y + 'deg)' + ' rotateZ(' + z + 'deg)' });
    $(this).css({ 'transition': '0.7s ease-in-out' });
    return $(this);
};
jQuery.fn.rotate3d = function (x, y, z, angle) {
    $(this).css({ 'transform': 'rotate3d(' + x + ',' + y + ',' + z + ',' + angle + 'deg)' });
    $(this).css({ 'transition': '0.7s ease-in-out' });
    return $(this);
};
function rotate(vec, axis, angle) {
    var c = Math.cos(angle * Math.PI / 180.0),
        s = Math.sin(angle * Math.PI / 180.0),
        x = axis[0], y = axis[1], z = axis[2],

        // rotation matrix form
        rm00 = c + x * x * (1 - c),
        rm10 = z * s + y * x * (1 - c),
        rm20 = -y * s + z * x * (1 - c),
        rm01 = -z * s + x * y * (1 - c),
        rm11 = c + y * y * (1 - c),
        rm21 = x * s + z * y * (1 - c),
        rm02 = y * s + x * z * (1 - c),
        rm12 = -x * s + y * z * (1 - c),
        rm22 = c + z * z * (1 - c);

    return Array(
        rm00 * vec[0] + rm01 * vec[1] + rm02 * vec[2],
        rm10 * vec[0] + rm11 * vec[1] + rm12 * vec[2],
        rm20 * vec[0] + rm21 * vec[1] + rm22 * vec[2]
    );
}
//Signalr Connection
const connection = new signalR.HubConnectionBuilder()
    .withUrl('/tilthub')
    .build();
connection.start();

//event handlers
var plane = $("#plane");
connection.on("rotated3axis", (x, y, z) => {
    
    console.log(x, y, z);
    plane.rotateR(x, y, z);
    //console.log(plane.css("transform"));
    function round(x) { return ((x * 10) >> 0) / 10.0; }
    var b = round(x),
        g = -round(y),
        a = round(z),
        default_angle = 0; // assuming "portrait-primary" is the default screen orientation

    if (screen.mozOrientation == "landscape-primary") default_angle += -90;
    else if (screen.mozOrientation == "landscape-secondary") default_angle += 90;
    else if (screen.mozOrientation == "portrait-secondary") default_angle += 180;

    var default_z = Array(0, 0, 1),
        default_x = rotate(Array(1, 0, 0), default_z, default_angle),
        default_y = rotate(Array(0, 1, 0), default_z, default_angle),
        axis_y = default_y,
        axis_x = rotate(default_x, axis_y, g),
        axis_z = rotate(rotate(default_z, axis_y, g), axis_x, b);

    document.getElementById("cube").style.transform =
        "rotate3d(" + axis_z[0] + ", " + axis_z[1] + ", " + axis_z[2] + ", " + a + "deg) " +
        "rotate3d(" + axis_x[0] + ", " + axis_x[1] + ", " + axis_x[2] + ", " + b + "deg) " +
        "rotate3d(" + axis_y[0] + ", " + axis_y[1] + ", " + axis_y[2] + ", " + g + "deg) " +
        "rotateZ(" + default_angle + "deg)";
    $("#cube").css({ 'transition': '0.7s ease-in-out' });

});
//Get all axis values
function getAxisValues() {
    let x = $("#sliderx").val();
    let y = $("#slidery").val();
    let z = $("#sliderz").val();
    return { x, y, z };
}
//Send axes values on slider change
$("#sliderx").on('input', function () {
    var axis = getAxisValues();
    connection.invoke("Rotate3Axis", axis.x, axis.y, axis.z);
});
$("#slidery").on('input', function () {
    var axis = getAxisValues();
    connection.invoke("Rotate3Axis", axis.x, axis.y, axis.z);
});

$("#sliderz").on('input', function () {
    var axis = getAxisValues();
    connection.invoke("Rotate3Axis", axis.x, axis.y, axis.z);
});
window.addEventListener("deviceorientation", function (e) {
    function round(x) { return ((x * 10) >> 0) / 10.0; }
    var b = round(e.beta),
        g = -round(e.gamma),
        a = round(e.alpha),
        default_angle = 0; // assuming "portrait-primary" is the default screen orientation

    if (screen.mozOrientation == "landscape-primary") default_angle += -90;
    else if (screen.mozOrientation == "landscape-secondary") default_angle += 90;
    else if (screen.mozOrientation == "portrait-secondary") default_angle += 180;

    var default_z = Array(0, 0, 1),
        default_x = rotate(Array(1, 0, 0), default_z, default_angle),
        default_y = rotate(Array(0, 1, 0), default_z, default_angle),
        axis_y = default_y,
        axis_x = rotate(default_x, axis_y, g),
        axis_z = rotate(rotate(default_z, axis_y, g), axis_x, b);

    document.getElementById("cube").style.transform =
        "rotate3d(" + axis_z[0] + ", " + axis_z[1] + ", " + axis_z[2] + ", " + a + "deg) " +
        "rotate3d(" + axis_x[0] + ", " + axis_x[1] + ", " + axis_x[2] + ", " + b + "deg) " +
        "rotate3d(" + axis_y[0] + ", " + axis_y[1] + ", " + axis_y[2] + ", " + g + "deg) " +
        "rotateZ(" + default_angle + "deg)";

    
}, false);


