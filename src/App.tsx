import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

interface Movies {
  Title: string,
  Poster: string
}

const App = () => {
  const [movies, setMovies] = useState<Movies[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const fetchMovies = async () => {
      let allMovies: Movies[] = []

      for (let i = 1; i <= 10; i++) {
        const response = await fetch(`http://www.omdbapi.com/?s=movie&page=${i}&apikey=1aec6d68`)

        if (!response.ok) {
          console.error('Error Fetching')
          return
        }

        const data = await response.json()
        allMovies = [...allMovies, ...data.Search]
      }

      setMovies(allMovies)
    }

    fetchMovies()
  }, [])

  const filterMovies = 
    movies.filter(movie => movie.Title.toLowerCase().includes(search.toLowerCase()))

  return (
    <Container>
      <Box>
        <TextField type="search" variant="outlined" placeholder='Search...'  fullWidth value={search} onChange={e => setSearch(e.target.value)}/>
      </Box> 
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginTop: 5}}>
        {filterMovies.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} >
              <Item key={index} {...movie}/>
            </Grid>
        ))}
      </Grid>
    </Container>
  )
}


const Item = ({Poster, Title}: Movies) => {
  return (
    <Card sx={{ maxWidth: 250 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={Poster}
            alt={Title}
            sx={{borderRadius: 8, cursor: 'pointer'}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {Title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  )
}

export default App