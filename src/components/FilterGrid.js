import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity } from 'react-native';
import { Chip } from 'react-native-paper';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import Slider from '@react-native-community/slider';
import { Button, RadioButton } from 'react-native-paper';
import SelectMultiple from 'react-native-select-multiple';

const FilterRange = ({ state, setState, title, icon, unit, step, min, max, label, maxOrMin }) => {
  const [visible, setVisible] = useState(false);
  let left = 160 / (max - min) * state.displayValue - 20 - 160 * min / (max - min);

  return (<Popover
    isVisible={visible}
    onRequestClose={() => {
      setVisible(false);
      setState({...state, displayValue: state.filterValue});
    }}
    placement={PopoverPlacement.BOTTOM}
    arrowStyle={{backgroundColor: 'transparent'}}
    from={(
      <TouchableOpacity onPress={() => setVisible(true)}>
          <Chip icon={icon} compact={true} selectedColor={state.active ? 'white' : 'black'}
            textStyle={{fontFamily: 'Avenir', fontSize: 13}}
            style={[styles.filterBtn, {backgroundColor: state.active ? '#19D2CC' : '#EFEFEF'}]}
          >
            {title}
          </Chip>
      </TouchableOpacity>
    )}>
    <View style={styles.filterCard}>
      <Text style={styles.label}>{label}</Text>
      <Text style={{top: 7, left: left, width: 80, marginBottom: 6, textAlign: 'center', fontFamily: 'Avenir', fontWeight: '300', fontSize: 12 } }>
          {Math.floor(state.displayValue) + " " + unit}
      </Text>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={min}
        maximumValue={max}
        step={step}
        minimumTrackTintColor="#1AB0A8"
        maximumTrackTintColor="#22D2C9"
        value={state.displayValue}
        onSlidingComplete={val => setState({...state, displayValue: val})}
      />
      <View style={{flexDirection: 'row', marginLeft: 20}}>
        <Button icon="close" compact={true} onPress={() => {
            setState({active: false, filterValue: (maxOrMin === "max" ? max : min), displayValue: (maxOrMin === "max" ? max : min)});
            setVisible(false);
          }}
          color="#515151"
          style={{alignSelf: 'center', top: 5, left: -5}}
          labelStyle={{fontFamily: 'Futura', fontSize: 12}}>Remove
        </Button>
        <Button icon="check" compact={true} onPress={() => {
          setState({...state, active: true, filterValue: state.displayValue});
          setVisible(false);
        }}
          color="#515151"
          style={{alignSelf: 'center', top: 5, left: -12}}
          labelStyle={{fontFamily: 'Futura', fontSize: 12}}>
            Apply
        </Button>
      </View>
    </View>
  </Popover>)
}

const FilterSelect = ({ state, setState, icon, title, label, items }) => {
  const [visible, setVisible] = useState(false);
  return (
    <Popover
      isVisible={visible}
      onRequestClose={() => {
        setVisible(false);
        setState({...state, displayValue: state.filterValue});
      }}
      arrowStyle={{backgroundColor: 'transparent'}}
      from={(
        <TouchableOpacity onPress={() => setVisible(true)}>
            <Chip icon={icon} compact={true} selectedColor={state.active ? 'white' : 'black'}
              textStyle={{fontFamily: 'Avenir', fontSize: 13}}
              style={[styles.filterBtn, {backgroundColor: state.active ? '#19D2CC' : '#EAEAEA'}]}
            >
              {title}
            </Chip>
        </TouchableOpacity>

      )}>
      <View style={styles.filterCard}>
        <Text style={styles.label}>{label}</Text>

        <ScrollView style={{marginTop: 3}}>
            <SelectMultiple
              items={items}
              selectedItems={state.displayValue}
              checkboxSource={require('../assets/checkbox-unchecked.png')}
              checkboxStyle={{width: 20, height: 20, marginLeft: -10}}
              selectedCheckboxSource={require('../assets/checkbox-checked.png')}
              onSelectionsChange={(val) => setState({...state, displayValue: val})}
              rowStyle={{borderBottomWidth: 0, marginBottom: -15}}
              labelStyle={{fontFamily: 'Avenir', fontWeight: '300', top: 1, left: 10}}
              style={{top: -5}}
             />
        </ScrollView>


        <View style={{flexDirection: 'row', marginLeft: 20, top: 5}}>
          <Button icon="close" compact={true} onPress={() => {
              setState({active: false, displayValue: [], filterValue: []});
              setVisible(false);
            }}
            color="#515151"
            style={{alignSelf: 'center', top: 5, left: -5}}
            labelStyle={{fontFamily: 'Futura', fontSize: 12}}>Remove
          </Button>
          <Button icon="check" compact={true} onPress={() => {
            setState({...state, active: true, filterValue: state.displayValue});
            setVisible(false);
          }}
            color="#515151"
            style={{alignSelf: 'center', top: 5, left: -12}}
            labelStyle={{fontFamily: 'Futura', fontSize: 12}}>
              Apply
          </Button>
        </View>
      </View>
    </Popover>
  )
}


const PromotersFilterGrid = ({ price, setPrice, clients, setClients, availability, setAvailability, influenceBadge, setInfluenceBadge, languages, setLanguages }) => {

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterGrid}>
      <FilterRange setState={setPrice} state={price} maxOrMin="max"
              icon="currency-usd" title="Promoter Fees"
              label="Maximum Promoter Fees"
              unit="MMK"
              min={500} max={5000} step={100}
       />

       <FilterRange setState={setClients} state={clients} maxOrMin="min"
               icon="account-key" title="Clients Sourced"
               label="Minimum # of Clients Sourced"
               unit=""
               min={0} max={100} step={1}
        />

        <FilterSelect state={influenceBadge} setState={setInfluenceBadge}
                  icon="instagram" title="Influence Badge"
                  items={["Loyalist", "Advocate", "Influencer"]}
                  label="Influence Badge"
        />

       <FilterRange setState={setAvailability} state={availability} maxOrMin="min"
               icon="clock" title="Availability"
               label="Minimum Weekly Availability"
               unit="hrs"
               min={3} max={15} step={1}
        />

         <FilterSelect state={languages} setState={setLanguages}
           items={["English", "Burmese"]}
           icon="alphabetical" title="Languages" label="Preferred Languages" />


    </ScrollView>
  )

}

const EventsFilterGrid = ({ price, setPrice, category, setCategory, date, setDate }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterGrid}>
        <FilterRange setState={setPrice} state={price} maxOrMin="min"
                icon="currency-usd" title="Promoter Fees"
                label="Minimum Promoter Fees"
                unit="MMK"
                min={0} max={5000} step={100}
         />
         <FilterRange state={date} setState={setDate} maxOrMin="max"
           icon="calendar" title="Event Date" label="Occuring in the next" unit="Days" min={0} max={30} step={1}/>
         <FilterSelect state={category} setState={setCategory}
           icon="buffer" title="Event Category" label="Event Category" items={["Show", "Night Out", "Themed Event", "Couples Event", "Activity"]}/>
    </ScrollView>)

}

const styles = StyleSheet.create({
  filterGrid: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 32,
    marginBottom: 5
  },
  filterBtn: {
    marginRight: 10
  },
  filterCard: {
    padding: 25,
    width: 255,
  },
  label: {
    fontFamily: 'Avenir',
    fontSize: 15,
    top: -5
  },
  radioLabel: {
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 14,
    top: 10,
    left: 5
  },

})

export { PromotersFilterGrid, EventsFilterGrid };
