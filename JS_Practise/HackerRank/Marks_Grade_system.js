
console.log("Enter the number!");
const data = require('fs').readFileSync(0, 'utf8');
processData(data);


function processData(data) {
//Do not declare variable marks.
//Write your code below this line.
let mark=Number(data);
if(mark>90)
{
    console.log("AA");
}
else if (mark>80 && mark <=90)
{
    console.log("AB");
}
else if (mark > 70 && mark <=80)
{
    console.log("BB");
}
else if (mark >60 && mark <=70)
{
    console.log("BC");
}
else if (mark >50 && mark <=60)
{
    console.log("CC");
}
else if(mark > 40 && mark <=50)
{
    console.log("CD");
}
else if(mark > 30 && mark <=40)
{
    console.log("DD");
}
else
{
    console.log("FF");
}
}