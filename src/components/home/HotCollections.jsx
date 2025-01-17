import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const HotCollections = () => {
  const [nfts, setNFTs] = useState([]);
  const [owl, setOwl] = useState(false);
  const [loading, setLoading] = useState(true);
  const options = {
    items: 4,
    loop: true,
    margin: 10,
    nav: true,
    mouseDrag: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
      1200: { items: 4 },
    },
  };

  useEffect(() => {
    async function fetchNFTs() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections/`
      );
      setNFTs(data);
      setLoading(false);
      setOwl(true);
    }
    fetchNFTs();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      data-aos="fade-right"
      id="section-collections"
      className="no-bottom"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!loading ? (
            <OwlCarousel {...options}>
              {nfts.map((nfts, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${nfts.nftId}`}>
                      <img
                        src={nfts.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${nfts.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={nfts.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{nfts.title}</h4>
                    </Link>
                    <span>ERC-{nfts.code}</span>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel {...options}>
              {new Array(1).fill(0).map((_, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to="">
                      <Skeleton width="100%" height="200px" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="">
                      <Skeleton
                        width="100px"
                        height="20px"
                        borderRadius="2px"
                      />
                    </Link>
                    <br />
                    <Skeleton width="60px" height="20px" borderRadius="2px" />
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
