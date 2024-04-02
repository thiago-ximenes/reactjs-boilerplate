import { useEffect, useState } from "react";
import productListRequest from "../../requests/auth/product-list.request.ts";
import { ProductListResponse } from "../../types/responses/product-list-response.type.ts";
import Container from "@mui/material/Container";
import { Card, CardContent, Typography, IconButton, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import authRoutesConstants from "../../constants/routes/auth-routes.constants.ts";

export default function ProductListPage() {
  const [data, setData] = useState<ProductListResponse | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    productListRequest().then((response) => {
      setData(response.data)
    })
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg"
    >
      <Grid container spacing={ 6 }>
        <Grid item xs={ 12 }>
          <Typography component="h1" variant="h3">Lista de Produtos</Typography>
        </Grid>
        { data?.map((product) => (
          <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } key={ product.id }>
            <Card
              elevation={ 6 }
            >
              <CardContent>
                <Grid container spacing={ 2 }>
                  <Grid item xs={ 10 }>
                    <Typography
                      component="h2"
                      variant="h5"
                    >
                      { product.name }
                    </Typography>
                    <Typography>
                      Preço: { Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(product.price / 100) }
                    </Typography>
                    <Typography>
                      Quantidade: { product.quantity }
                    </Typography>
                  </Grid>
                  <Grid item xs={ 2 }>
                    <IconButton
                      color="warning"
                      aria-label="editar produto"
                      onClick={
                        () => navigate(authRoutesConstants.productListById.replace(':id', String(product.id)))
                      }
                    >
                      <Tooltip title="Editar" placement="top">
                        <EditIcon/>
                      </Tooltip>
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )) }
      </Grid>
    </Container>
  )
}