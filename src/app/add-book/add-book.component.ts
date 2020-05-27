import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {getAuthorsList, addBookMutation, getBooksList} from '../queries';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  authors: any[];
  loading = true;
  error: any;
  state = {
    name: '',
    genre: '',
    authorID: ''
  }
  constructor(private apollo: Apollo) { 

  }

  ngOnInit() {
    this.apollo.watchQuery({
      query:getAuthorsList
    }).valueChanges.subscribe((result:any) => {
        console.log('res',result);
        this.authors = result.data && result.data.authors;
        this.loading = result.loading;
        this.error = result.error;
    })
  }

  onNameChange(value){
    this.state.name = value;
  }

  onGenreChange(value){
    this.state.genre = value;
  }

  authorSelected(value){
    this.authors.filter( val => {
      if(val.name === value){
        this.state.authorID = val.id
      }
    })
    // this.state.authorID = v
  }

  onSubmit(){
    console.log('state',this.state);
    this.apollo.mutate({
      mutation: addBookMutation,
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorID: this.state.authorID
      },
      refetchQueries: [
        { query: getBooksList}
      ]
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
    this.state = {
      name: '',
      genre: '',
      authorID: ''
    }
  }

}
