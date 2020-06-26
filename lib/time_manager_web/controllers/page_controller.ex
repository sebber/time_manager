defmodule TimeManagerWeb.PageController do
  use TimeManagerWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def admin(conn, _params) do
    conn
    |> put_layout({TimeManagerWeb.LayoutView, "spa.html"})
    |> render("admin.html")
  end
end
