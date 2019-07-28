import React, {Component} from 'react'; 

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state ={
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            width: "300px",
            height: "500px",
            allMemeImgs: []
        }
         this.handleChange = this.handleChange.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                console.log(memes[5])
                this.setState({ allMemeImgs: memes })
            })
    }
    
 handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
        
    }

    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        const width1 = this.state.allMemeImgs[randNum].width
        const height1 = this.state.allMemeImgs[randNum].height
        console.log(randMemeImg)
        this.setState({ randomImg: randMemeImg, width: width1, height: height1 })
        
        
    }


    render () {
        return (

            <div>
               
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input name="topText"
                        type="text"
                        value={this.state.topText} 
                        onChange={this.handleChange}  
                        placeholder="topText" />
                    <input name="bottomText"
                        type="text"
                        value={this.state.bottomText} 
                        onChange={this.handleChange} 
                        placeholder="bottomText" />

                <button>Gen</button>
                </form>
                <div className="meme">
                 <img lign="center" src={this.state.randomImg} height={this.state.height} width={this.state.width} alt="" />
                <br />
                <h2 className="top">{this.state.topText}</h2>
                <h2 className="bottom">{this.state.bottomText}</h2>
                
                </div>
                </div>

        )
    }

    
}

export default MemeGenerator; 
