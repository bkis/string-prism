function getColorChannelValue(from, modifier){
    return 20 + parseInt((((from * 7251) % (42 + modifier)) / (42 + modifier)) * 235, 10) * 0.75;
}

function getResultElement(input){
    let element = $("<div/>");
    input.split('').forEach((c,i) => {
        let r = getColorChannelValue(c.codePointAt(0), 113);
        let g = getColorChannelValue(c.codePointAt(0), 22);
        let b = getColorChannelValue(c.codePointAt(0), 358);
        let color = "rgba(" + r + "," + g + "," + b + ", 1.0)";
        let codes = "\\u" + c.codePointAt(0).toString(16).toUpperCase() +
            "<br>" + "&amp;#" + c.codePointAt(0) + "\;";
        let charLink = $(
            "<a href='https://codepoints.net/U+" + 
            c.codePointAt(0).toString(16) + 
            "' target='_blank' " +
            "title='" + codes + "' />");
        let char = $("<div class='char'/>").css("background-color", color);
        charLink.append(char);
        char.append($("<div class='enc'/>").text(c));
        char.append($("<div class='codepoint'/>").html("<b>" + i + "</b>" + codes));
        element.append(charLink);
    });
    return element;
}

function processInput(){
    let result = $("#result");
    result.html("");

    // ORIGINAL
    let input = $("#input").val();
    if (input.length === 0) return;
    result.append($("<h2>original input (Length: " + input.length + ")</h2>"));
    result.append(getResultElement(input));

    // NFC
    let inputNFC = $("#input").val().normalize('NFC');
    result.append("<h2>NFC-normalized (Length: " + inputNFC.length + ")</h2>");
    result.append(getResultElement(inputNFC));

    // NFD
    let inputNFD = $("#input").val().normalize('NFD');
    result.append("<h2>NFD-normalized (Length: " + inputNFD.length + ")</h2>");
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