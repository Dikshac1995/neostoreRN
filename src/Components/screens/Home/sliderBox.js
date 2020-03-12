import React, { Component } from 'react'
import { Text, View, StyleSheet,Image } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import { connect } from 'react-redux';
import { FetchImage } from '../../../Redux/Action/index'
import {getPeople} from '../../../Redux/Action/listaction'

class SliderBox1 extends Component {
    
    componentDidMount() {
        //Dispatch your dispatcher
        this.props.getPeople();

    }
   
    getData() {
      
        const { people, loading } = this.props;
        console.log("load", loading)
        console.log("people123", people)
        if (this.props.loading) {
            return (<Text>Loading...........</Text>)
            // return this.props.people.map((people) => {
            //     console.log('anv', people.category_name);
            //     <Text>{people.category_name}</Text>
            // });
             }
        else { 
            var img
             img = this.props.people.map((people) => people.product_image);
            var images = img.map((a) => 'http://180.149.241.208:3022/'.concat(a))
            console.log("ncc", images)
              return   < SliderBox autoplay circleLoop images = {images} />
           // return images
            //return this.props.people.map((people) => {
                console.log('anv', people.product_image);
                // img = 'http://180.149.241.208:3022/' + people.product_image;
                // return <SliderBox autoplay circleLoop images={img} />
               // console.log("d",images)
               // return  <Image source={{ uri: 'http://180.149.241.208:3022/' + people.product_image}}></Image>
            //return <Text>{people.category_name}</Text>
            // const url = 'http://180.149.241.208:3022/';
               // return
                // <Image source={{
                //     uri: 'http://180.149.241.208:3022/' + people.product_image
                // }} />
                //<Text>{url.concat(people.product_image)}</Text>
                
                // return <SliderBox autoplay circleLoop images={people.category_name} />
        }
            //);

     // <Text>Loading...........</Text> 
           
       //
    }
    render() {
        // const { people, loading } = this.state;
        // const { people, loading } = this.props;
        // console.log("load",loading)
        // console.log("people123", people)
        return (
            <>
            <View>{this.getData()}</View>
                {/* <SliderBox autoplay circleLoop images={images} /> */}
                </>
        )
        // let image = people.map((a) => a.product_image)
        //let res = people.map(a => a.product_image);
        //console.log(image)
        // if (!loading) {
        //     return (
        //         <View >
        //             {people.length ? people.map((person, i) => <Text key={i}>{person.category_name}/</Text>) : <Text>No People found</Text>}
        //         </View>
        //     );
        // } else {
        //     return (
               
        //         <Text>Loading...........</Text> 
                
        //     )
        // }
    }
}


//Map the redux state to your props.
const mapStateToProps = state => ({
    people: state.listReducer.people,
    loading: state.listReducer.loading,
});

//Map your action creators to your props.
const mapDispatchToProps= (dispatch)=>{
    return {
        getPeople: () => dispatch(getPeople())
    };
}
   
//     constructor(props) {
//         super(props);
//         this.state = {
//             // images: [
//             //     "https://source.unsplash.com/1024x768/?nature",
//             //     "https://source.unsplash.com/1024x768/?water",
//             //     "https://source.unsplash.com/1024x768/?girl",
//             //     "https://source.unsplash.com/1024x768/?tree", // Network image
//             //      // Local image
//             // ],
//             dataSource: [],

//         };
//     } 
//     componentDidMount() {
//         console.log("before");
//         // this.props.getPeople();
//         //this.props.FetchImage();
//         console.log("after");
        
//         return fetch('http://180.149.241.208:3022/getAllCategories')
//             .then(res => res.json())
//             .then(response => {
//                 this.setState({
//                     dataSource: response.category_details,
//                 });
//             })
//             .catch(error => {
//                 console.log(error);
//        });
//     }
    
//     render() {
//      const   images = this.props;
//         // console.log("images slider ", sliderImage);
//         const imageData = this.state.dataSource;
//         let res = imageData.map(a => a.product_image);
//         const url = 'http://180.149.241.208:3022/';
//         let Image = res.map((a) => { return url.concat(a) })
//         console.log('rr',Image);
//         console.log('hh', this.state.images)
        
//         console.log('counter :', this.props)
//         console.log('counter :', this.props.count)
//         console.log('imageReducer :', this.props.image)

//         console.log('imges:',images)
//         return (
//             <View style={styles.container}>
                
//                 <SliderBox autoplay circleLoop images={Image} />
//                 {/* <SliderBox autoplay circleLoop images={images} /> */}
//       </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     }
// });

// const mapStateToProps = state => ({
//     count: state.count,
//     stat: state,
//     image: state.imageReducer,
//     people: state.people,
//     loading: state.loading,
// });

// const mapDispatchToProps = {
//     // getPeople,
// }
// // const ac = {
// //     FetchImage:FetchImage
// // }
// // const mapDispatchToProps = dispatch => ({
// //     // FetchImage: () => dispatch(FetchImage())
// //    FetchImage:FetchImage

// // });
// // const mapStateToProps = state=> {
// //     const { data } = state.imageReducer;
// //     return {
// //         // sliderImage: state.imageReducer
// //         data
// //     }
// // }
// // const mapDispatchToProps = dispatch => {
// //     return {
// //           fetchImages:()=>dispatch(fetchImages())
// //       }
// // }
  
export default connect(mapStateToProps, mapDispatchToProps)(SliderBox1)

//export default connect(mapStateToProps, ac)(SliderBox1)