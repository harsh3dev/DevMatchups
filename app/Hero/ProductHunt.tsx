"use client";
import Image from 'next/image';
import Link from 'next/link';


const ProductHunt = () => {
  return (
    <Link href="https://www.producthunt.com/posts/devmatchups?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-devmatchups" className='z-10 mt-5' target="_blank">
    <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=490128&theme=light" alt="DevMatchups - Find&#0032;teams&#0032;and&#0032;skilled&#0032;teammates&#0032;for&#0032;your&#0032;next&#0032;hackathon&#0033; | Product Hunt" style={{width: "250px", height: "54px"}} width="250" height="54" />
    </Link>
  )
}

export default ProductHunt
