defmodule TimeManager.Calendar do
  @moduledoc """
  The Calendar context.
  """

  import Ecto.Query, warn: false
  alias TimeManager.Repo

  alias TimeManager.Calendar.Event

  @doc """
  Returns the list of events.

  ## Examples

      iex> list_events()
      [%Event{}, ...]

  """
  def list_events(params \\ %{}) do
    Event
    |> filter_from_date(params)
    |> filter_to_date(params)
    |> order_by(^filter_order_by(params[:order_by]))
    |> Repo.all()
  end

  defp filter_from_date(query, %{from: from}) do
    from(
      event in query,
      where: event.end >= ^from
    )
  end
  defp filter_from_date(query, _), do: query

  defp filter_to_date(query, %{to: to}) do
    from(
      event in query,
      where: event.start <= ^to
    )
  end
  defp filter_to_date(query, _), do: query 


  defp filter_order_by("title"),
    do: [desc: dynamic([e], e.title)]
  defp filter_order_by("title_asc"),
    do: [asc: dynamic([e], e.title)]

  defp filter_order_by("start"),
    do: [desc: dynamic([e], e.start)]
  
  defp filter_order_by("start_asc"),
    do: [asc: dynamic([e], e.start)]
  
  defp filter_order_by(_),
    do: filter_order_by("start_asc")

  @doc """
  Gets a single event.

  Raises `Ecto.NoResultsError` if the Event does not exist.

  ## Examples

      iex> get_event!(123)
      %Event{}

      iex> get_event!(456)
      ** (Ecto.NoResultsError)

  """
  def get_event!(id), do: Repo.get!(Event, id)

  @doc """
  Creates a event.

  ## Examples

      iex> create_event(%{field: value})
      {:ok, %Event{}}

      iex> create_event(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_event(attrs \\ %{}) do
    %Event{}
    |> Event.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a event.

  ## Examples

      iex> update_event(event, %{field: new_value})
      {:ok, %Event{}}

      iex> update_event(event, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_event(%Event{} = event, attrs) do
    event
    |> Event.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a event.

  ## Examples

      iex> delete_event(event)
      {:ok, %Event{}}

      iex> delete_event(event)
      {:error, %Ecto.Changeset{}}

  """
  def delete_event(%Event{} = event) do
    Repo.delete(event)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking event changes.

  ## Examples

      iex> change_event(event)
      %Ecto.Changeset{data: %Event{}}

  """
  def change_event(%Event{} = event, attrs \\ %{}) do
    Event.changeset(event, attrs)
  end
end
