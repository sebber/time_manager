defmodule TimeManagerWeb.Schema.ContentTypes do
  use Absinthe.Schema.Notation

  object :event do
    field :id, :id
    field :title, :string
    field :start, :naive_datetime
    field :end, :naive_datetime
  end
end