var gg = 5;
var ggString = gg.toString();
var ggLastResult = ggString.split('');
while(ggLastResult.length < 4){
    ggLastResult.unshift(0);
}

console.log(ggLastResult)

function getDigits(gg){
    var ggString = gg.toString();
    var ggLastResult = ggString.split('');
    while(ggLastResult.length < 4){
        ggLastResult.unshift(0);
    }
}