
<ScrollView style={{ flex: 1, backgroundColor: 'pink' }}>



    {/* product section start  */}

    {this.FlatListItemSeparator()}

    {/* <View style={{ flex: 1 }}> */}

    <View style={{}}>
        <FlatList data={this.state.productData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
                <TouchableOpacity onPress={() => this.removeProduct(index)}>
                    <View style={styles.product} >
                        <View style={styles.product_row}>
                            <View style={styles.productName_wrapper}>
                                <Text style={styles.productName_text}>{item.product_name}</Text>
                            </View>
                            <Image style={{ width: 110, height: 80, resizeMode: 'stretch' }} source={{
                                uri: api.baseUrl + item.product_image
                            }} />
                        </View>
                        <View style={styles.product_row}>
                            <View style={styles.productProducer_text}>
                                <Text style={styles.productProducer_text}>{item.product_producer}</Text>
                            </View>
                            <View>
                                <Text style={styles.product_cost}>
                                    Rs.{item.product_cost * this.state.quantity[index]}</Text>
                            </View>
                        </View>
                        <View>
                            <Picker
                                selectedValue={this.state.quantity[index]}
                                style={{ width: 100 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.pickerChange(index, itemValue)} >
                                <Picker.Item label="1 " value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4 " value="4" />
                                <Picker.Item label="5 " value="5" />

                            </Picker>
                        </View>

                    </View>
                </TouchableOpacity>}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.FlatListItemSeparator} />
        {/* </View> */}

        {/* sfooter section  */}
        {this.FlatListItemSeparator()}
        <View style={styles.priceDetail}>
            <Text style={styles.priceDetail_text}>Price Detail</Text>
            <View style={styles.priceDetailWrapper}>

                <Text style={styles.priceDetail_totalCost}>Price</Text>
                <Text style={styles.priceDetail_totalCost}>Rs.{this.state.finalCost}</Text>
            </View>
        </View>
    </View>
</ScrollView>