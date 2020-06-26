defmodule TimeManager.Calendar.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :end, :naive_datetime
    field :start, :naive_datetime
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:title, :start, :end])
    |> validate_required([:title, :start, :end])
  end
end
