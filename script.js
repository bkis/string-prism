function getColorChannelValue(from, modifier){
    return parseInt((((from * 95) % (42 + modifier)) / (42 + modifier)) * 255, 10) * 0.75;
}

function getResultElement(input){
    let element = $("<div/>");
    input.split('').forEach(c => {
        let r = getColorChannelValue(c.codePointAt(0), 11);
        let g = getColorChannelValue(c.codePointAt(0), 2);
        let b = getColorChannelValue(c.codePointAt(0), 35);
        let color = "rgba(" + r + "," + g + "," + b + ", 1.0)";
        let char = $("<div class='char'/>").css("border-color", color);
        char.append($("<div class='enc'/>").text(c));
        char.append($("<div class='codepoint'/>").html(
            "\\u" + c.codePointAt(0).toString(16).toUpperCase() + "<br>" +
            "&amp;#" + c.codePointAt(0) + "\;"
        ).css("background-color", color));
        element.append(char);
    });
    return element;
}

function processInput(){
    let result = $("#result");
    result.html("");

    // ORIGINAL
    let input = $("#input").val();
    if (input.length === 0) return;
    result.append($("<h2>original input (" + input.length + ")</h2>"));
    result.append(getResultElement(input));

    // NFC
    let inputNFC = $("#input").val().normalize('NFC');
    result.append("<h2>NFC-normalized (" + inputNFC.length + ")</h2>");
    result.append(getResultElement(inputNFC));

    // NFD
    let inputNFD = $("#input").val().normalize('NFD');
    result.append("<h2>NFD-normalized (" + inputNFD.length + ")</h2>");
    result.append(getResultElement(inputNFD));
}

$(function() {
    $("#input-form").submit(function(e) {
        e.preventDefault();
        processInput();
    });
    $("#input").on("input", function() {
        processInput();
    });
    $("#input").val("Et Voilà!");
    processInput();
});