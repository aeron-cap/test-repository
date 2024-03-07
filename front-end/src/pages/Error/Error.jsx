import { Link, useRouteError } from "react-router-dom";
import { Fragment } from "react";
import { Stack, Center, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Fragment>
      <Stack direction="column" justify="center" height="100vh" width="90vw">
        <Center textAlign="center">
          <div>
            <Text fontWeight="bold" fontSize="4xl">
              Oops!
            </Text>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error?.statusText || error?.message}</i>
              <Link to="/" style={{ fontStyle: "italic" }}>
                Go back Home
              </Link>
            </p>
          </div>
        </Center>
      </Stack>
    </Fragment>
  );
};

ErrorPage.propTypes = {};
export default ErrorPage;
