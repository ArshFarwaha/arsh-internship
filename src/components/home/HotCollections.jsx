import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import "./HotCollections.css";

const HotCollections = () => {
  const [nfts, setNFTs] = useState([]);
  const [owl, setOwl] = useState(false);
  const [loading, setLoading] = useState(true);
  const options = {
    items: 4,
    loop: true,
    margin: 10,
    nav: true,
    lazyLoad: true,
    lazyContent: true,
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

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            new Array(6).fill(0).map((_, index) => (
              <div className="nft_coll skeleton-box" key={index}>
                <div className="nft_wrap skeleton-box">
                  <Link to={`/item-details/${nfts.nftId}`}>
                    <img className="lazy img-fluid skeleton-box" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll skeleton-box" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4 className="skeleton-box"></h4>
                  </Link>
                  <span className="skeleton-box"></span>
                </div>
              </div>
            ))
          ) : (
            <OwlCarousel {...options}>
              {nfts.map((nfts, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft_coll">
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
                      <Link to="/author">
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
