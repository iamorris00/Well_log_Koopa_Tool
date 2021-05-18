// ~V	- contains version and wrap mode information
// ~W	- contains well identification
// ~C	- contains curve information
// ~P	- contains parameters or constants
// ~O	- contains other information such as comments
// ~A	- contains ASCII log data

export const lasFileCurvesProcess = (str) =>{

    let posDataSegment = str.indexOf("~A")
    let headerStr = str.substring(0, posDataSegment-1)

    let headerSegments = normalizeHeader(headerStr).split("\n~");
    let curvesName = []
    let lines = []

    for (let i = 0; i < headerSegments.length; i++) {
        if ( headerSegments[i].charAt(0).toUpperCase()==="C" ){
            headerSegments[i].includes('\r\n') ? curvesName.push(headerSegments[i].split('\r\n')) :
                curvesName.push(headerSegments[i].split('\n'))
        }
    }

    for (let i = 1; i < curvesName[0].length; i++) {
        if(!curvesName[0][i].startsWith('#')){
            lines.push(curvesName[0][i])
        }
    }


    return lines.map(curve => ({
        mnemonic: curve.split(':')[0].split('.')[0],
        unit: curve.split(':')[0].split('.')[1].split(' ')[0],
        desc: curve.split(':')[1],
    }))
}

export const processLasData = (str) => {

    //Get the ASCII segment
    const posDataSegment = str.indexOf("~A")
    let dataStr = str.substring(posDataSegment + 2, str.length)

    // Replace space separated values to coma separated values
    dataStr = dataStr.replace(/  +/g, ",")

    // Verify if the lines are separated by /r/n if not, just separate by /n
    let linesOfData = dataStr.includes('\r\n') ? dataStr.split('\r\n') : dataStr.split('\n')


    for (let i = 0; i < linesOfData.length; i++) {

        if(linesOfData[i].startsWith(',')){
            linesOfData[i] = linesOfData[i].substring(1)
        }
        linesOfData[i] = linesOfData[i].trim()
    }

    if(linesOfData[0].startsWith('D') || linesOfData[0].startsWith("")){
        linesOfData.shift()
    }

    let curvesName = lasFileCurvesProcess(str)

    linesOfData.unshift(curvesName.map(curve => curve.mnemonic).toString().trim())

    return linesOfData.join('\n')
}



// Normalize Header: including remove leading spaces of every line; remove the empty lines
const normalizeHeader = (str) =>{
    let t = str.split("\n")
    let str2 = "\n";

    for (let i=0; i<t.length; i++){
        if ( t[i].length>0 && (t[i].trim()).length >0 ){
            if ( i === t.length-1)
                str2 += t[i].trim();
            else
                str2 += (t[i].trim()+"\n");
        }
    }

    return str2;
}