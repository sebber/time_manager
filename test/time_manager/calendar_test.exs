defmodule TimeManager.CalendarTest do
  use TimeManager.DataCase

  alias TimeManager.Calendar

  describe "events" do
    alias TimeManager.Calendar.Event

    @valid_attrs %{end: ~N[2010-04-17 14:00:00], start: ~N[2010-04-17 14:00:00], title: "some title"}
    @update_attrs %{end: ~N[2011-05-18 15:01:01], start: ~N[2011-05-18 15:01:01], title: "some updated title"}
    @invalid_attrs %{end: nil, start: nil, title: nil}

    def event_fixture(attrs \\ %{}) do
      {:ok, event} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Calendar.create_event()

      event
    end

    test "list_events/0 returns all events" do
      event = event_fixture()
      assert Calendar.list_events() == [event]
    end

    test "get_event!/1 returns the event with given id" do
      event = event_fixture()
      assert Calendar.get_event!(event.id) == event
    end

    test "create_event/1 with valid data creates a event" do
      assert {:ok, %Event{} = event} = Calendar.create_event(@valid_attrs)
      assert event.end == ~N[2010-04-17 14:00:00]
      assert event.start == ~N[2010-04-17 14:00:00]
      assert event.title == "some title"
    end

    test "create_event/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Calendar.create_event(@invalid_attrs)
    end

    test "update_event/2 with valid data updates the event" do
      event = event_fixture()
      assert {:ok, %Event{} = event} = Calendar.update_event(event, @update_attrs)
      assert event.end == ~N[2011-05-18 15:01:01]
      assert event.start == ~N[2011-05-18 15:01:01]
      assert event.title == "some updated title"
    end

    test "update_event/2 with invalid data returns error changeset" do
      event = event_fixture()
      assert {:error, %Ecto.Changeset{}} = Calendar.update_event(event, @invalid_attrs)
      assert event == Calendar.get_event!(event.id)
    end

    test "delete_event/1 deletes the event" do
      event = event_fixture()
      assert {:ok, %Event{}} = Calendar.delete_event(event)
      assert_raise Ecto.NoResultsError, fn -> Calendar.get_event!(event.id) end
    end

    test "change_event/1 returns a event changeset" do
      event = event_fixture()
      assert %Ecto.Changeset{} = Calendar.change_event(event)
    end
  end
end
