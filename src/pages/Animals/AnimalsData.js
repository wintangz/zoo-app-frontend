import React, { useState } from "react";
import tiger from '~/assets/animals/tiger.jpg'

const animals = [
    { id: '1', name: 'Tiger', img: 'https://media.istockphoto.com/id/1018245126/photo/siberian-tiger-portrait.jpg?s=170667a&w=0&k=20&c=pzpXX4olk95jQ8gdD9PJJ54YijC28oim9I9OiPDY0vs=', content: 'The tiger (Panthera tigris) is the largest living cat species and a member of the genus Panthera. It is most recognisable for its dark vertical stripes on orange fur with a white underside.', picture: tiger },
    { id: '2', name: 'Elephant', img: 'https://images.fineartamerica.com/images-medium-large-5/african-elephant-portrait-san-diego-zoo.jpg' },
    { id: '3', name: 'Giraffe', img: 'https://img.cdn-pictorem.com/uploads/collection/L/LA4AGA8MHN/900_Thula-Photography_Giraffe%20Portrait%201460.jpg' },
    { id: '4', name: 'Lion', img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/portrait-male-african-lion-brit-finucci.jpg' },
    { id: '5', name: 'Deer', img: 'https://i.pinimg.com/originals/c5/c4/97/c5c497dc741032ce63c07f696c5b3e05.jpg' },
    { id: '6', name: 'Crocodile', img: 'https://thumbs.dreamstime.com/b/crocodile-face-20006542.jpg' },
    { id: '7', name: 'Chimpanzee', img: 'https://media.istockphoto.com/id/1368096050/photo/male-common-chimpanzee.jpg?s=612x612&w=0&k=20&c=hxapN4ecHVHoxMIxMobY8wZl5YbUS8GkTo0o6jDeObI=' },
    { id: '8', name: 'Zebra', img: 'https://d3e1m60ptf1oym.cloudfront.net/17428db9-1eb0-42fd-8393-9efab5016613/zebra-portrait001_xgaplus.jpg' },
    { id: '9', name: 'Rhinoceros', img: 'https://media.sciencephoto.com/c0/25/04/11/c0250411-800px-wm.jpg' },
    { id: '10', name: 'Panda', img: 'https://images.fineartamerica.com/images-medium-large-5/portrait-of-a-juvenile-giant-panda-tony-camacho.jpg' },

]

export default animals