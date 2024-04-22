import { useState, useEffect } from 'react'
import reactStringReplace from 'react-string-replace'
import '../App.css'

//used reactStringReplace library to safely replace type.fit "author"
// https://www.youtube.com/watch?v=NyZzRSTZQ2Y   this as a reference
function QuoteBox() {
  
  const [quotes, setQuotes] = useState([])
  //const [isLoading, setIsLoading] = useState(false)
  const [randomQuote, setRandomQuote] = useState("")

  const url = "https://type.fit/api/quotes"

  useEffect(() => {
    async function getQuotes() {
      try {
        const res = await fetch(url)
        const data = await res.json()
        //data.replace("type.fit", "replace")
        setQuotes(data)
        let randomIndex = Math.floor(Math.random() * data.length)
        setRandomQuote(data[randomIndex])
      }
      catch(err) {
        new Error("Trouble getting quotes!!")
      }
      
    }
    getQuotes()
  }, [])

  function getNewQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length)
      setRandomQuote(quotes[randomIndex])   
  }

  /*
  useEffect(() => {
    async function getQuotes() {
      setIsLoading(true)
      await fetch(url) //is a promise. its gets json string data and returns a object it cant also get a url object
      .then((res) => { 
        if (!res.ok) throw new Error("Trouble getting quotes!!")
        return res.json()
      }) //extract JSON string and convert to an Object
      .then((dataArray) => {
        console.log(dataArray)
        setQuotes([dataArray]) 
        let randomIndex = Math.floor(Math.random() * dataArray.length)
        setRandomQuote(dataArray[randomIndex])
        setIsLoading(false)                     //returned data is a array of objects
      })
      .catch((err) => {
        setIsLoading(false)
        console.warn(err.message)
      })
    }
    getQuotes()
  }, [])
  */
//On first page load show random text and author
//when button is clicked it will fetch a new quote/author and display it
  return (
    <div id="quote-box">
      <div className="card">
      <div className="card-content">
        <div id="text" className="title">
          {randomQuote ? (
          <>
            <h3>&quot;{randomQuote.text}&quot;</h3> 
          </>
          ) : (
            <p>Loading...</p> 
          )}
        </div>
      <p id="author" className="subtitle">{reactStringReplace(randomQuote.author, /(, type.fit)/g, () => <span key={/(, type.fit)/g}></span>)}</p>
    </div>
    <footer className="card-footer">
      <p className="card-footer-item">
        <span>
          <a href="twitter.com/intent/tweet" target="_blank" id="tweet-quote"><button className="button is-dark">Tweet Quote</button></a>
        </span>
      </p>
      <p className="card-footer-item">
        <button className="button is-link" id="new-quote" onClick={getNewQuote}>New Quote</button>
      </p>
    </footer>
    </div>    
    </div>
  )
}
export default QuoteBox

 

