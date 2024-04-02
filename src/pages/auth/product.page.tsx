import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productRequest from "../../requests/auth/product.request.ts";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import authRoutesConstants from "../../constants/routes/auth-routes.constants.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProductSchema } from "../../schemas/auth/edit-product.schema.ts";
import Box from "@mui/material/Box";
import { EditProductEntityType } from "../../types/entity/edit-product-entity.type.ts";
import editProductRequest from "../../requests/auth/edit-product.request.ts";
import { ProductEntityType } from "../../types/entity/product-entity.type.ts";

export default function ProductPage() {
  const { id } = useParams();
  const [productData, setProductData] = useState<ProductEntityType | null>(null);

  const navigate = useNavigate()

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProductEntityType>({
    resolver: zodResolver(editProductSchema)
  });

  useEffect(() => {
    productRequest(id!).then((response) => {
      const product = response.data;
      setProductData({
        ...product,
        price: formatBRLCurrency(product.price)
      });

      Object.entries(product).forEach(([key, value]) => {
        if (key === 'price') {
          setValue(key, formatBRLCurrency(value as number));
        } else {
          setValue(key as 'name' | 'price' | 'quantity', value as string);
        }
      });
    });
  }, [id, setValue]);

  function formatBRLCurrency(value: number | string): string {
    if (!value) return value as string;

    if (typeof value === 'string') {
      const onlyNumber = value.replace(/\D/g, '');
      value = Number(onlyNumber);
    }

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);
  }

  const { onChange, ...priceRegister } = register('price');

  const onSubmit: SubmitHandler<EditProductEntityType> = (data) => {
    const editedProduct: ProductEntityType = {
      ...productData,
      ...data as unknown as ProductEntityType,
      price: Number(data.price.replace(/\D/g, ''))
    }
    editProductRequest(editedProduct).then(() => {
      window.location.reload();
    });
  }

  return (
    <Container
      component="main"
      maxWidth="lg"
    >
      <Grid container spacing={ 6 }>
        <Grid item xs={ 12 }>
          <Typography component="h1" variant="h3">Produto</Typography>
        </Grid>

        <Grid item xs={ 12 }>
          <Box component="form" onSubmit={ handleSubmit(onSubmit) } noValidate>
            <Grid container spacing={ 6 }>
              <Grid item xs={ 12 } sm={ 4 }>
                <TextField
                  label="Nome do Produto"
                  variant="outlined"
                  fullWidth
                  error={ !!errors.name }
                  helperText={ errors.name?.message }
                  { ...register('name') }
                />
              </Grid>
              <Grid item xs={ 12 } sm={ 4 }>
                <TextField
                  label="Preço"
                  variant="outlined"
                  fullWidth
                  onChange={ (event) => {
                    event.target.value = formatBRLCurrency(event.target.value);
                    return onChange(event);
                  } }
                  error={ !!errors.price }
                  helperText={ errors.price?.message }
                  { ...priceRegister }
                />
              </Grid>
              <Grid item xs={ 12 } sm={ 4 }>
                <TextField
                  label="Quantidade"
                  variant="outlined"
                  fullWidth
                  type="number"
                  error={ !!errors.quantity }
                  helperText={ errors.quantity?.message }
                  { ...register('quantity') }
                />
              </Grid>
              <Grid item container justifyContent={ {
                xs: 'center',
                sm: 'flex-end',
              } } xs={ 12 } spacing={ 3 }>
                <Button
                  variant="contained"
                  color="error"
                  onClick={ () => navigate(authRoutesConstants.productList) }
                  sx={ {
                    width: {
                      xs: '100%',
                      sm: 'auto',
                    },
                    marginBottom: {
                      xs: 2,
                      sm: 0,
                    },
                    marginRight: {
                      xs: 0,
                      sm: 2,
                    },
                  } }
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={ () => reset(productData as unknown as EditProductEntityType || undefined) }
                  sx={ {
                    width: {
                      xs: '100%',
                      sm: 'auto',
                    },
                    marginBottom: {
                      xs: 3,
                      sm: 0,
                    },
                    marginRight: {
                      xs: 0,
                      sm: 3,
                    },
                  } }
                >
                  Restaurar
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={ {
                    width: {
                      xs: '100%',
                      sm: 'auto',
                    },
                    marginBottom: {
                      xs: 3,
                      sm: 0,
                    },
                    marginRight: {
                      xs: 0,
                      sm: 3,
                    },
                  } }
                >
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}