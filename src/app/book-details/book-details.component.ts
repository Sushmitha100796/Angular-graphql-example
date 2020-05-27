import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {getBookById} from '../queries';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  loading = true;
  error: any;
  book: Book;
  noBook= true;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    console.log('book',this.book);
    this.noBook = true;
  }

  getBookDetails(){
    this.apollo.watchQuery({
      query: getBookById,
      // variables: [{
      //   id: bookid
      // }]
    }).valueChanges.subscribe( (result:any) =>{
      console.log("book-details",result);
      this.book = result.data.book;
    })
  }

}

class Book{
  name: String
  genre: String
  author: {
    name: String
    age:String
    books: [{
      name: String
    }]
  }
}


