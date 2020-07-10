import React, {Component} from 'react'

class BookByID extends Component {
    constructor(props){
        super(props)
        this.state={
            book: {},
            editedBook: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getBook(){
        fetch(`http://localhost:3000/books/${this.props.match.params.id}`)
        .then(response=>response.json())
        .then(json => this.setState({book: json,editedBook: json}))
    .catch(error => console.error(error))
    }

    handleChange(event){
        this.setState({editedBook:{[event.target.id]: event.target.value}});
    }

    handleSubmit(event){
        fetch(`http://localhost:3000/books/${this.props.match.params.id}`,{
            body: JSON.stringify({
                title: this.state.editedBook.title,
                author: this.state.editedBook.author,
                genre: this.state.editedBook.genre,
                pubdate: this.state.editedBook.pubdate,
                isbn: this.state.editedBook.isbn

            }),
            method: 'PUT',
            headers:{
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(createdBook => {
            return createdBook.json();
        }).then(jsonBook => {
            console.log(jsonBook);
        }).catch(error=> console.log(error));
    }

    componentDidMount(){
        this.getBook();
        console.log(this.props.match.params);
    }
    render(){
        const book = this.state.book
        return(
            <>
                <h1>Hello world: book by ID</h1>
                <div className="bookbox">
                    <h3>{book.title}</h3>
                    <h4>By {book.author}</h4>
                    <p>Genre: {book.genre}</p>
                    <p>Published on {book.pubdate}</p>
                    <p>ISBN: {book.isbn}</p>
                </div>
                <h2>Edit Book Data:</h2>
                    <form onSubmit={this.handleSubmit}>
                    <label htmlFor='title'>Title</label>
                    <input type='text' value={this.state.editedBook.title} onChange={this.handleChange} id='title'/>
                    <label htmlFor='author'>Author</label>
                    <input type='text' value={this.state.editedBook.author} onChange={this.handleChange} id='author'/>
                    <label htmlFor='genre'>Genre</label>
                    <input type='text' value={this.state.editedBook.genre} onChange={this.handleChange} id='genre'/>
                    <label htmlFor='pubdate'>Publication Date</label>
                    <input type='text' value={this.state.editedBook.pubdate} onChange={this.handleChange} id='pubdate'/>
                    <label htmlFor='isbn'>ISBN Number</label>
                    <input type='text' value={this.state.editedBook.isbn} onChange={this.handleChange} id='isbn'/>
                    <input type='submit'/>
                </form>
            </>
        )
    }
}

export default BookByID