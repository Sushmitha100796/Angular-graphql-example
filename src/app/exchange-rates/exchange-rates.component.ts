import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {getBooksList, getBookById} from '../queries';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit {
  books: any[];
  loading = true;
  error: any;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery({
      query:getBooksList
    }).valueChanges.subscribe((result:any) => {
      // console.log('data',result);
        this.books = result.data && result.data.books;
        console.log('books',this.books);
        this.loading = result.loading;
        this.error = result.error;
    })
  }

  getBookDetails(bookid){
    console.log('clicked book id is ',bookid, typeof(bookid));
    this.apollo.watchQuery({
      query: getBookById,
      // variables: [{
      //   id: bookid
      // }]
    }).valueChanges.subscribe( (result:any) =>{
      console.log("getBookById",result);
    })
  }

}
