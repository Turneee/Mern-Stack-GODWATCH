import React, { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux' 
import { getProductsBySlug } from '../../../actions' 
import { generatePublicUrl } from '../../../urlConfig' 
import {Link} from 'react-router-dom' 
import { Card } from './../../../components/UI/Card/index' 



/**
* @author
* @function ProductStore
**/

export const ProductStore = (props) => {
  const product = useSelector(state => state.product) 
  const [priceRange, setPriceRange] = useState({
    under100: 100,
    under200: 200,
    under500: 500,
    under1000: 1000,
    under10000: 10000
  }) 
  const dispatch = useDispatch() 

  useEffect(() => {
    const { match } = props 
    dispatch(getProductsBySlug(match.params.slug)) 
  }, [])   
  return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <Card
                            headerLeft = {`${props.match.params.slug} mobile under ${priceRange[key]}`}
                            headerRight = {<button>view all</button>}
                            style={{ 
                                width: 'calc(100% - 40px)', 
                                margin: '20px' 
                            }}
                        >
                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map(product =>
                                        <Link 
                                        to = {`/${product.slug}/${product._id}/p`}
                                        style={{    
                                            display: 'block'
                                         }} className='productContainer'>
                                            <div className='productImgContainer'>
                                                <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                                            </div>
                                            <div className='productInfo'>
                                                <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                <div>
                                                    <span>1.2</span>&nbsp 
                                                    <span>1234</span>
                                                </div>
                                                <div className='productPrice'>{product.price}</div>
                                            </div>
                                        </Link>
                                    )
                                }

                            </div>
                        </Card>
                    )
                })
            }
        </>
    )

}

