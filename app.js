document.addEventListener('DOMContentLoaded',() =>{
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let score = 0
    const reloadtButton = document.querySelector(".retry-button");
    
    
    
    // Reload everything:
    function reload() {
        reload = location.reload();
    }
    // Event listeners for reload
    // reloadButton.addEventListener("click", reload, false);


    //playng board
    function createBoard(){
        for(let i=0;i<width*width;i++){
            let square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
    }
    createBoard()

    //generating a random number
    function generate(){
        let randomNumber = Math.floor(Math.random()*squares.length)

        if (squares[randomNumber].innerHTML==0){
            squares[randomNumber].innerHTML = 2
        }
        else{
            generate()
        }
    }

    //swipe right
    function moveRight(){
        for(let i=0;i<width*width;i++){
            if(i%4==0){
                let TotalOne = squares[i].innerHTML
                let TotalTwo = squares[i+1].innerHTML
                let TotalThree = squares[i+2].innerHTML
                let TotalFour = squares[i+3].innerHTML
                let row = [parseInt(TotalOne),parseInt(TotalTwo),parseInt(TotalThree),parseInt(TotalFour)]

                let filteredRow = row.filter(num => num)
                
                let missing = 4 - filteredRow.length
                let zeroes = Array(missing).fill(0)
                let newRow = zeroes.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    //swipe left
    function moveLeft(){
        for(let i=0;i<width*width;i++){
            if(i%4==0){
                let TotalOne = squares[i].innerHTML
                let TotalTwo = squares[i+1].innerHTML
                let TotalThree = squares[i+2].innerHTML
                let TotalFour = squares[i+3].innerHTML
                let row = [parseInt(TotalOne),parseInt(TotalTwo),parseInt(TotalThree),parseInt(TotalFour)]

                let filteredRow = row.filter(num => num)
                
                let missing = 4 - filteredRow.length
                let zeroes = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeroes)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    function CombineRow(){
        for(let i=0;i<15;i++){
            if(squares[i].innerHTML===squares[i+1].innerHTML){
                let combinedTotal = parseInt(parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML))
                squares[i+1].innerHTML = combinedTotal
                squares[i].innerHTML =0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function Combinecolumn(){
        for(let i=0;i<12;i++){
            if(squares[i].innerHTML===squares[i+width].innerHTML){
                let combinedTotal = parseInt(parseInt(squares[i].innerHTML)+parseInt(squares[i+width].innerHTML))
                squares[i+width].innerHTML = 0
                squares[i].innerHTML = combinedTotal
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
    }

    //keycodes
    function control(e){
        if(e.keyCode === 39){
            keyRight()
        }
        else if(e.keyCode===37){
            keyLeft()
        }
        else if(e.keyCode===38){
            keyUp()
        }
        else if(e.keyCode===40){
            keyDown()
        }
    }
    document.addEventListener('keyup',control)

    function keyRight() {
        moveRight()
        CombineRow()
        moveRight()
        generate()
    }

    function keyLeft() {
        moveLeft()
        CombineRow()
        moveLeft()
        generate()
    }

    function keyUp() {
        moveUp()
        Combinecolumn()
        moveUp()
        generate()
    }

    function keyDown() {
        moveDown()
        CombineRow()
        moveDown()
        generate()
    }

    function moveDown(){
        for(let i=0; i<4; i++){
            let TotalOne = squares[i].innerHTML
            let TotalTwo = squares[i+width].innerHTML
            let TotalThree = squares[i+width*2].innerHTML
            let TotalFour = squares[i+width*3].innerHTML
            let column = [parseInt(TotalOne),parseInt(TotalTwo),parseInt(TotalThree),parseInt(TotalFour)]

            let filteredColumn = column.filter(num => num)
                
            let missing = 4 - filteredColumn.length
            let zeroes = Array(missing).fill(0)
            let newColumn = zeroes.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]
        }
    }

    function moveUp(){
        for(let i=0; i<4; i++){
            let TotalOne = squares[i].innerHTML
            let TotalTwo = squares[i+width].innerHTML
            let TotalThree = squares[i+width*2].innerHTML
            let TotalFour = squares[i+width*3].innerHTML
            let column = [parseInt(TotalOne),parseInt(TotalTwo),parseInt(TotalThree),parseInt(TotalFour)]

            let filteredColumn = column.filter(num => num)
                
            let missing = 4 - filteredColumn.length
            let zeroes = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeroes)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]
        }
    }

    function checkForWin(){
        for(let i=0;i<squares.length;i++){
            if(squares[i]=="2048"){
                resultDisplay = 'You Win :)'
                document.removeEventListener('keyup',control)
            }
        }
    }
    function checkForLoose(){
        let zeros = 0
        for(let i=0;i<squares.length;i++){
            if(squares[i]==''){
                zeros++
            }
        }
        if(zeros === 0){
            resultDisplay='You Loose :('
            document.removeEventListener('keyup',control)
        }
    }
})