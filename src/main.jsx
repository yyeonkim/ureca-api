import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { getCampingImageList } from "./api/camping.js";
import CampingModal from "./components/CampingModal.jsx";
import Layout from "./components/layout/Layout.jsx";
import "./index.css";
import CampingPage from "./pages/CampingPage.jsx";
import WeatherPage from "./pages/WeatherPage.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <WeatherPage /> },
      {
        path: "/camping",
        Component: CampingPage,
        children: [
          {
            path: ":contentId",
            Component: CampingModal,
            loader: async ({ params }) => {
              const imgData = await getCampingImageList({
                contentId: params.contentId,
                numOfRows: 6,
              });
              return { imgData };
            },
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
