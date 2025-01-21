"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

type Item = { name: string; color: string };

type ListItemProps = {
  isSelected?: boolean;
  item: Item;
  onSelectChange?: () => void;
};

type ListProps = {
  items: Item[];
};

export default function Home() {
  // Implement a feature to allow item selection with the following requirements:
  // 1. Clicking an item selects/unselects it.
  // 2. Multiple items can be selected at a time.
  // 3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance).
  // 4. Currently selected items should be visually highlighted.
  // 5. Currently selected items' names should be shown at the top of the page.
  //
  // Feel free to change the component structure at will.

  const ListItem = ({
    isSelected = false,
    item,
    onSelectChange,
  }: ListItemProps) => {
    useEffect(() => {
      console.log("ListItem render", item.name, isSelected);
    }, [item, isSelected]);

    const handleItemClick = useCallback(() => {
      if (onSelectChange) {
        onSelectChange();
      }
    }, [onSelectChange]);

    return (
      <li
        className={`List__item List__item--${item.color} ${isSelected ? "selected" : ""}`}
        onClick={handleItemClick}
      >
        {item.name}
      </li>
    );
  };

  const List = ({ items }: ListProps) => {
    useEffect(() => {
      console.log("List render");
    }, []);

    const [selectedItems, setSelectedItems] = useState<Item[]>([]);

    const selectedItemNames = useMemo(
      () =>
        items
          .filter((item) => selectedItems.includes(item))
          .map((item) => item.name)
          .join(", "),
      [items, selectedItems],
    );

    const handleSelectChange = useCallback((item: Item) => {
      setSelectedItems((currentSeletedItems) => {
        if (!currentSeletedItems.includes(item)) {
          return [...currentSeletedItems, item];
        } else {
          return currentSeletedItems.filter(
            (currentItem) => currentItem !== item,
          );
        }
      });
    }, []);

    return (
      <Fragment>
        <p>Currently Selected: {selectedItemNames}</p>
        <ul className="List">
          {items.map((item) => (
            <ListItem
              key={item.name}
              isSelected={selectedItems.includes(item)}
              item={item}
              onSelectChange={() => handleSelectChange(item)}
            />
          ))}
        </ul>
      </Fragment>
    );
  };

  // ---------------------------------------
  // Do NOT change anything below this line.
  // ---------------------------------------

  const sizes = ["tiny", "small", "medium", "large", "huge"];
  const colors = [
    "navy",
    "blue",
    "aqua",
    "teal",
    "olive",
    "green",
    "lime",
    "yellow",
    "orange",
    "red",
    "maroon",
    "fuchsia",
    "purple",
    "silver",
    "gray",
    "black",
  ];
  const fruits = [
    "apple",
    "banana",
    "watermelon",
    "orange",
    "peach",
    "tangerine",
    "pear",
    "kiwi",
    "mango",
    "pineapple",
  ];

  const items = sizes.reduce(
    (items: Item[], size) => [
      ...items,
      ...fruits.reduce(
        (acc: Item[], fruit) => [
          ...acc,
          ...colors.reduce(
            (acc: Item[], color) => [
              ...acc,
              {
                name: `${size} ${color} ${fruit}`,
                color,
              },
            ],
            [],
          ),
        ],
        [],
      ),
    ],
    [],
  );

  return <List items={items} />;
}
