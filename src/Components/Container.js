import {useState,useEffect} from 'react'
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import randomWords from 'random-words'
import useCountDown from 'react-countdown-hook';
import  './styles.css'
import Score from './Score'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp  } from '@fortawesome/free-solid-svg-icons'


function Container() {
    const [timeLeft, actions] = useCountDown(60000, 10);
    const [wordList2Render,setWordList2Render] = useState([])
    const [value,setValue] = useState("")
    const [stat,setStat] = useState('first')
    const [stat2, setStat2] = useState('first')
    const [success,setSuccess] = useState(0)
    const [failure,setFailure] = useState(0)
    const [score,setScore]=useState([])
    const [scoreVisible,setScoreVisible] = useState(false)

    useEffect(()=>{
        setWordsArr()
    },[])

    useEffect(() => {
        if(wordList2Render[0]){
            let index = wordList2Render[0].indexOf(wordList2Render[0].find((element) => element.isActive === true)) 
            if (!wordList2Render[0][index].word.startsWith(value)){
                wordList2Render[0][index].activeWrong = true
            }else {
                wordList2Render[0][index].activeWrong = false
            }
        }
        
    },[value,wordList2Render])
    

    const setWordsArr = ()=>{
        let rowCheck = 0
        let list = []
        while(true){
            let word = randomWords()
            let span = 0
            switch(word.length){
                case 2:
                    span = 1
                    break;
                case 3:
                    span = 2
                    break;
                case 4:
                    span = 2
                    break;
                case 5:
                    span = 3
                    break;
                case 6:
                    span = 3
                    break;
                case 7:
                    span = 4
                    break;
                case 8:
                    span = 4
                    break;
                default:
                    span = 5
                    break;
            }
            
            if(rowCheck + span >= 45){
                setWordList2Render([list])
                break;} 

            rowCheck += span
            list.push({'word':word,'span':span, 'isActive':false, 'activeWrong':false, 'completed':'not',})        
        }
    }


    if(timeLeft === 0 && stat2 === 'second'){
        actions.reset()
        setStat2('first')
        setStat('first')
        setWordsArr()
        setScore([success,failure])
        setSuccess(0)
        setFailure(0)
        alert('Time is up.')
        setScoreVisible(true)
        setValue("")
    }

    const handleType = (e) => {
        if(stat2 === 'first') actions.start()
        setScoreVisible(false)
        setStat2('second')
        

        if(e.charCode === 32){
            e.preventDefault();
            setValue('')
            let index = wordList2Render[0].indexOf(wordList2Render[0].find((element) => element.isActive === true))
            if(index +1 >= wordList2Render[0].length){
                setWordsArr()
                setStat('first')
                console.log(wordList2Render[0])
                console.log(index)
                return 
            }else {
                if(wordList2Render[0][index].word === value){
                    wordList2Render[0][index].completed = 'success'
                    setSuccess(success + 1)
                }else{
                    wordList2Render[0][index].completed = 'failure'
                    setFailure(failure + 1)
                }
            }
            

            wordList2Render[0][index+1].isActive = true
            wordList2Render[0][index].isActive = false
            setStat('second') 
            
        } 
    }

    const handleClick = () => {
        setWordsArr()
        setStat('first')
        actions.reset()
        setStat2('first')
        setValue("")
        setSuccess(0)
        setFailure(0)
    }


    return (
        <>
            <h1 className='main_title'>Typer Speed App</h1>

            <div className='textholder'>
                <Row gutter={[0,5]}>
                    {
                        wordList2Render[0]
                        && wordList2Render[0].map((element,i)=>{
                                if(i === 0 && stat === 'first') element.isActive = true
                                return(
                                    <Col key={i} span={element.span}>
                                        <span className={`word ${element.isActive ? 'isActive':''} ${element.activeWrong ? 'activeWrong':''} ${element.completed === 'success' ? 'success':''} ${element.completed === 'failure' ? 'failure':''} `}>{element.word}</span>
                                    </Col>)
                            
                        })
                    }
                    
                </Row>
            </div>
            <div className='inputholder'>
                <Row>
                    <Col span={16} offset={4}>
                        <Row gutter={[10,0]}>
                            <Col span={16}>
                                <input value={value} onKeyPress={handleType} onChange={(e)=>setValue(e.target.value)} className='inp' type="text" name="" id="" />
                            </Col>
                            <Col span={3}>
                                <div className='counter'> {(timeLeft / 1000).toFixed(1)} </div>
                            </Col>
                            <Col span={3}>
                                <button onClick={handleClick} className='restartButton'> <FontAwesomeIcon icon={faAngleDoubleUp} /> </button>
                            </Col> 
                        </Row>
                    </Col>

                    <Score visible ={scoreVisible} data={[score[0],score[1]]}/>
                </Row>

            </div>
            

        </>
    )
}

export default Container
