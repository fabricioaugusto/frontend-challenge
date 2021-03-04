import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import * as S from './styles'
import logo from '../../assets/imgs/logo.png'
import { Layout } from '../../components'
import { getArtist } from '../../utils'
import { Album, Artist } from '../../utils/types'
import ArtistHeader from '../../components/Artists/ArtistHeader'
import AlbumList from '../../components/Albums/AlbumList'
import PageSubTitle from '../../components/common/PageSubTitle'
import { useTransition, animated } from 'react-spring'

const SingleArtist = () => {
  const [artist, setArtist] = useState<Artist>()
  const [albums, setAlbums] = useState<Album[]>([])
  const history = useHistory()

  const transitions = useTransition(!!artist, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  useEffect(() => {
    const arrPathNames = history.location.pathname.split('/')
    const artistId = arrPathNames[arrPathNames.length - 1]

    getArtist(artistId).then(result => {
      if (result) {
        setArtist(result.artist)
        setAlbums(result.albums.items)
      }
    })
  }, [history])

  return (<Layout>
    <S.Wrapper>
      <S.Content>
        <S.TopBar>
          <Link to={'/busca'}>
            <IoIosArrowBack />
          </Link>
          <S.Logo src={logo} />
        </S.TopBar>
        {transitions.map(({ item, key, props }) =>
          (item && !!artist) && <animated.div style={props}><S.ArtistWrapper>
              <ArtistHeader artist={artist} />
              <PageSubTitle title={'Álbuns'} />
              <AlbumList albums={albums} />
            </S.ArtistWrapper></animated.div>
        )}
      </S.Content>
    </S.Wrapper>
  </Layout>)
}

export default SingleArtist
